const handler = async (req, res) => {
  try {
    const { url, method } = req

    if (method === "POST") {
      const { user } = req.body
      console.log(user)
      if (user) return res.status(200).json({ message: "Success", data: user, error: null })

      return res.status(400).json({ message: "Failed", data: null, error: "Error try again" })
    }

    if (method == "DELETE") {
      return Promise.resolve()
    }

    res.status(405).json({
      message: "Failed",
      data: null,
      error: "The method specified in the Request-Line is not allowed for the resource",
    })
  } catch (err) {
    res.status(500).json({ message: "Failed", data: null, error: "failed to load data" })
  }
}

export default handler
