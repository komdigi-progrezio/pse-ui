# KOMINFO Pendaftaran Sistem Elektronik (PSE) - FRONTEND

## Kebutuhan

1. Node Versi ^12.5.0
2. Yarn Versi ^1.14.0

## Cara Instal Aplikasi

1. Buka Terminal
2. git clone -b dev https://gitlab.com/deerand/pse-ui.git
3. Masuk ke folder hasil clone tersebut di terminal lalu enter
4. Ketik "yarn install" di terminal lalu enter
5. Ketik "touch .env.development.local" lalu buka file tersebut
6. Isikan file tersebut seperti ini

```
VUE_APP_URL=http://kominfo-pse.test/
VUE_APP_BASE_API_URL=http://kominfo-pse.test/api/
VUE_DEVTOOLS=true
```

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
yarn serve

```

7. http://kominfo-pse.test merupakan base url untuk backend. Tolong dengan yang anda setup untuk backend nya
8. Selesai
