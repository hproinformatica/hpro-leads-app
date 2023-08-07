export = HPro
export as namespace HPro

import { StackScreenProps } from '@react-navigation/stack'

export enum Operation {
	Insert = 'I',
	Update = 'U',
	Delete = 'D',
	Consult = 'C'
}

declare namespace HPro {
	type date = string
	type time = string
	type datetime = string

	type float = number
	type integer = number

	type string = string
}
