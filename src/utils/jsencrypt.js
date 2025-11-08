import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALzTvU9nmS8giXd1Umq1LPwbMZDeSWWH\n' +
  'KeD8hTAyAeoDlfLoIeGgLqTDxOEtdsXke7kAHHiLhBEms4R/6bTYM78CAwEAAQ=='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

