const handler = async (req, res) => {
  try {
    const { url, method } = req

    if (method === "POST") {
        
    }
  } catch (err) {
    res.status(500).json({ message: "Failed", data: null, error: "failed to load data" })
  }
}

export default handler
