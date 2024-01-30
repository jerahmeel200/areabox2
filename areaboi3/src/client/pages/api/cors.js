export default function enableCors(req, res) {
  const allowedOrigins = [
    'https://areabox.app',
    'https://www.areabox.app',
    'https://areabox-firebase.vercel.app',
    'https://areabox-firebase-areaboi.vercel.app',
    'https://areabox-firebase-git-reverb-development-firebase9-areaboi.vercel.app'
  ];
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Origin',
    allowedOrigins.includes(req.headers.origin) ? req.headers.origin : ''
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
}
