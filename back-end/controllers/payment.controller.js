const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PaymentController = {
  payment: async (req, res) => {
    try {
      const { products } = req.body;

      if (!Array.isArray(products) || products.length === 0) {
        throw new Error('Products should be a non-empty array.');
      }

      const lineItems = products.map((product) => {
        const unitAmount = Math.round(Number(product.price) * 100);

        if (isNaN(unitAmount) || unitAmount <= 0) {
          throw new Error(`Invalid price for ${product.movie}`);
        }

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.movie,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:5173/success`,
      });

      res.status(200).json({
        id: session.id,
        url: session.url
      });
    } catch (error) {
      console.error('Error in payment controller:', error);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = PaymentController;
