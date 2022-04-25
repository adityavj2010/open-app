class Context {
  emailId: string;
  id: number;
}

export function GetContext(request): Context {
  const ctx = {
    emailId: '',
    id: 0,
  };

  ctx['emailId'] = request.raw.customContext.emailId;
  ctx['id'] = request.raw.customContext.id;
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
