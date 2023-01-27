function objectTranspiler(userData, message) {
    return (message) ? {
        text:message.text,
        author:{
        nombre:userData.nombre,
        apellido:userData.apellido,
        edad:userData.edad,
        alias:userData.alias,
        avatar:userData.avatar,
        id:userData.username,
        username:undefined,
        password:undefined
      }
      } : {
        author: {
          nombre:userData.nombre,
          id:userData.username,
          apellido:userData.apellido,
          edad:userData.edad,
          alias:userData.alias,
          avatar:userData.avatar,
          username:undefined,
          password:undefined
        }}
}
module.exports = objectTranspiler
