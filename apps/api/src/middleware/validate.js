export function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const dataToValidate = req[source];
      const result = schema.safeParse(dataToValidate);

      if (!result.success) {
        const issues = result.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));

        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: issues
        });
      }

      req[source] = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
}
