import { extend } from 'vee-validate'
import { required, email, confirmed, mimes } from 'vee-validate/dist/rules'

// Install rules
extend('required', {
  ...required,
  message: '{_field_} Harus di Isi',
})
extend('alpha_spaces', {
  ...required,
  message: '{_field_} Harus Alphabet dan Spasi',
})
extend('alpha_num', {
  ...required,
  message: '{_field_} Harus Alphabet dan Angka',
})
extend('integer', {
  ...required,
  message: '{_field_} Harus Angka',
})
extend('numeric', {
  ...required,
  message: '{_field_} Harus Angka',
})
extend('digits', {
  ...required,
  params: ['length'],
  message: '{_field_} Harus {length} Digit',
})
extend('email', {
  ...email,
  message: 'Format Email Tidak Sesuai',
})
extend('confirmed', {
  ...confirmed,
  params: ['target'],
  message: '{_field_} Tidak Sama dengan {target}',
})
extend('mimes', {
  ...mimes,
  message: '{_field_} Tidak Sesuai',
})
extend('min', {
  validate(value, args) {
    return value.length >= args.length
  },
  params: ['length'],
  message: '{_field_} Harus Lebih dari {length} Karakter',
})
