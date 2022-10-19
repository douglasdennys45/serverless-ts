import { Controller } from '@/interfaces/controllers'

type Adapter = (controller: Controller) => any

export const routeAdapter: Adapter = (controller: Controller) => async (context: any, req: any) => {
  const httpRequest = {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body
  }
  const { statusCode, body, error } = await controller.handle(httpRequest)
  let retorno: any
  if (statusCode > 199 && statusCode <= 299) {
    retorno = context.res = {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        requestId: context.res?._wrapper_log_request_id,
        data: body
      }
    }
  } else if (statusCode > 399) {
    retorno = context.res = {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        requestId: context.res?._wrapper_log_request_id,
        error
      }
    }
  }
  context.res = retorno
  return context
}
