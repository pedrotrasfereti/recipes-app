const getDate = () => {
  const date = new Date();
  // formatar a data para ser = DD/MM/YYYY - 01/05/2055
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // adiciona número 0 a esquerda
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default getDate;
