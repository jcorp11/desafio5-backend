function validateQueryParams(req, res, next) {
  // Extract query parameters from the request
  const { categoria, precio_min, precio_max, metal } = req.query;

  // Validate 'categoria' parameter (should be a string if provided)
  if (categoria !== undefined && typeof categoria !== "string") {
    return res
      .status(400)
      .send(
        'El parámetro "categoria" debe ser una cadena de texto si está presente'
      );
  }

  // Validate 'precio_min' parameter (should be a valid integer if provided)
  if (
    precio_min !== undefined &&
    (isNaN(parseInt(precio_min)) || !Number.isInteger(parseInt(precio_min)))
  ) {
    return res
      .status(400)
      .send(
        'El parámetro "precio_min" debe ser un número entero válido si está presente'
      );
  }

  // Validate 'precio_max' parameter (should be a valid integer if provided)
  if (
    precio_max !== undefined &&
    (isNaN(parseInt(precio_max)) || !Number.isInteger(parseInt(precio_max)))
  ) {
    return res
      .status(400)
      .send(
        'El parámetro "precio_max" debe ser un número entero válido si está presente'
      );
  }

  // Validate 'metal' parameter (should be a string if provided)
  if (metal !== undefined && typeof metal !== "string") {
    return res
      .status(400)
      .send(
        'El parámetro "metal" debe ser una cadena de texto si está presente'
      );
  }

  console.log(" all params have passed");

  // If all validations pass or if parameters are not present, continue to the next middleware/route handler
  next();
}

function logEndpoint(req, res, next) {
  console.log(`Request recieved: ${req.method} ${req.baseUrl + req.path}`);
  next(); // Llama a next() para pasar la solicitud al siguiente middleware
}

function logSuccess(req, res, next) {
  const originalSend = res.send;

  res.send = function (data) {
    console.log(`Success: ${req.method} ${req.baseUrl + req.path}`);
    originalSend.apply(res, arguments);
  };
  next();
}

export { validateQueryParams, logEndpoint, logSuccess };
