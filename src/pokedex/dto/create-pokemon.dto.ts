import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;


    @IsString({ message: 'El nombre debe ser obligatorio' })
    @MinLength(1)
    name: string;

}
