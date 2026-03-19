import bcrypt from "bcrypt"

const salt = bcrypt.genSaltSync(
	Number.parseInt(process.env.BCRYPT_SALT_ROUNDS!)
)

export function encrypt(unhashed: string): string {
	return bcrypt.hashSync(unhashed, salt)
}

export function compare(unhashed: string, hashed: string): boolean {
	return bcrypt.compareSync(unhashed, hashed)
}
