class Context {
  emailId: string;
  id: number;
}

export function GetContext(request): Context {
  const ctx = {
    emailId: '',
    id: 0,
  };
  const customContext = request.raw?.customContext
    ? request?.raw?.customContext
    : request.customContext;
  ctx['emailId'] = customContext.emailId;
  ctx['id'] = customContext.id;
  return ctx;
}
export function SetContext(request, token) {
  try {
    request['customContext'] = {};
    request['customContext']['id'] = token['id'];
    request['customContext']['emailId'] = token['emailId'];
  } catch (e) {
    console.error('Error', e);
  }
}
