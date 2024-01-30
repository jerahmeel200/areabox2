export default async function handler(req, res) {
  const { base, target } = req.query;

  try {
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?base=${base}&symbols=${target}&app_id=${process.env.EXCHANGE_RATE_KEY}`
    );
    const data = await response.json();
    console.log(data);
    const exchangeRate = data.rates[target];
    res.status(200).json({ exchangeRate });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exchange rates' });
  }
}
