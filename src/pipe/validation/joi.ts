import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import Joi, { ObjectSchema } from 'joi';

export const CreateUserSchema = Joi.object({
  fullName: Joi.string().min(4).max(20).required(),
  age: Joi.number().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().required(),
});

export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(values: any) {
    try {
      console.log(values);
      const { error, value } = this.schema.validate(values);
      console.log(this.schema.validate(values));
      return value;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
