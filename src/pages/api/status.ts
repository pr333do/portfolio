// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from 'octokit'

import openWeatherAPI, {
  IOpenWeatherAPIResponse,
} from 'services/openWeatherAPI'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

export interface IStatus {
  lastUpdateDate: string
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
  }
  dt: number
  timezone: number
  sys: {
    country: string
  }
  name: string
}

export default async function getLastUpdated(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { method } = req

  if (method === 'GET') {
    const octokit = new Octokit({
      auth: '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',
    })

    try {
      const {
        data: [commit],
      } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'pr333do',
        repo: 'portfolio',
        per_page: 1,
      })

      const lastUpdateDate = dateFormatter.format(
        new Date(commit.commit.author.date),
      )

      const { data } = await openWeatherAPI.get<IOpenWeatherAPIResponse>(
        'weather',
        {
          params: {
            q: 'Rio de Janeiro',
            appid: '6b3567f39fe4e6cfc4acd15eadf64c5b',
            units: 'metric',
          },
          responseType: 'json',
        },
      )

      const response = {
        ...data,
        lastUpdateDate,
        dt: data.dt * 1000,
      }

      res.status(200).json(response)
    } catch (err) {
      console.log(err)

      res.status(500).end('Internal Server Error')
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
