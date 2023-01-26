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
          ...userData,
          id:userData.user,
          user:undefined,
          password:undefined
        }}
}
module.exports = objectTranspiler
