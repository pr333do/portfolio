// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res): void => {
  res.status(200).json({
    message: `Storefront API: ${process.env.SHOPIFY_STOREFRONT_API_SECRET_KEY}`,
  })
}
