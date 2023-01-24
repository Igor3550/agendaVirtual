export function notFound() {
  return {
    name: 'NotFound',
    message: 'No results!'
  }
}

export function badRequest() {
  return {
    name: 'BadRequest',
    message: 'Invalid body item!'
  }
}
