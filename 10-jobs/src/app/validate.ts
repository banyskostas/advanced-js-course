import * as Joi from 'joi'
import { Request, Response, Next } from 'restify'

interface ValidationError {
    field: string
    message: string
}

interface ValidationErrors {
    validationErrors: ValidationError[]
}

function formatValidationError(joiValidationError: any): ValidationErrors {
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

interface ValidationResult<T> {
    value: T
    isValid: boolean
    error: ValidationErrors
}

export class Validator<T> {
    constructor(private schema: any) {
    }

    validate(obj: any): ValidationResult<T> {
        const validationResult = Joi.validate(obj, this.schema, {
            abortEarly: false,
            stripUnknown: true
        })

        return {
            value: validationResult.value,
            isValid: !validationResult.error,
            error: formatValidationError(validationResult.error)
        }
    }
}

export function validate(validator: Validator<any>) {
    return (req: Request, resp: Response, next: Next) => {
        const validationResult = validator.validate(req.body)
        if (validationResult.isValid) {
            req.body = validationResult.value
            next()
        } else {
            resp.status(400)
            resp.send(validationResult.error)
            resp.end()
            next(false)
        }
    }
}
