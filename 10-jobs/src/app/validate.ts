import * as Joi from 'joi'
import { Request, Response, Next } from 'restify'

function formatValidationError(joiValidationError: any) {
    const validationErrors = joiValidationError.details
        .map((e: any) => {
            return {
                field: e.path.join('.'),
                message: e.message
            }
        })

    return {
        validationErrors
    }
}

export function validate(schema: any) {
    return (req: Request, resp: Response, next: Next) => {
        const validationResult = Joi.validate(req.body, schema, {
            abortEarly: false,
            stripUnknown: true
        })
        if (validationResult.error) {
            resp.status(400)
            resp.send(formatValidationError(validationResult.error))
            resp.end()
            next(false)
        } else {
            req.body = validationResult.value
            next()
        }
    }
}
