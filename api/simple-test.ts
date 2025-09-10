// Minimal test function with no dependencies
export default async function handler(req: any, res: any) {
  try {
    res.status(200).json({
      message: 'Simple test works',
      timestamp: new Date().toISOString(),
      method: req.method
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
}