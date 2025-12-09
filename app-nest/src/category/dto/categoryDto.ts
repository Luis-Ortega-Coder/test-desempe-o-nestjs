import { class-validator } from 'class-validator';

export class CategoryDto {
    @class-validator
    
    IsString()
    name: string;

    @class-validator.IsString()
    description: string;
}   