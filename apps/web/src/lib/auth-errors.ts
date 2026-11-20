type AuthErrorLike = { code?: string; message: string; status?: number }

const MESSAGES: Record<string, string> = {
  invalid_credentials: 'Имэйл эсвэл нууц үг буруу байна.',
  email_not_confirmed: 'Имэйлээ баталгаажуулаагүй байна. Ирсэн захидлынхаа холбоос дээр дарна уу.',
  user_already_exists: 'Энэ имэйлээр бүртгэл үүссэн байна. Нэвтэрч орно уу.',
  email_exists: 'Энэ имэйлээр бүртгэл үүссэн байна. Нэвтэрч орно уу.',
  weak_password: 'Нууц үг хэт сул байна. Үсэг, тоо холисон урт нууц үг сонгоно уу.',
  email_address_invalid: 'Имэйл хаяг буруу байна.',
  over_email_send_rate_limit: 'Хэт олон имэйл илгээлээ. Хэдэн минут хүлээгээд дахин оролдоно уу.',
  over_request_rate_limit: 'Хэт олон оролдлого хийлээ. Хэдэн минут хүлээгээд дахин оролдоно уу.',
  signup_disabled: 'Шинэ бүртгэл түр хаалттай байна.',
}

/** Supabase Auth error → message shown to the user, in Mongolian. */
export function authErrorMessage(error: AuthErrorLike) {
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code]!
  if (error.status === 429) return MESSAGES.over_request_rate_limit!
  return 'Нэвтрэх үйлдэл амжилтгүй боллоо. Дахин оролдоно уу.'
}
