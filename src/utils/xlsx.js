
/**
 * @param tablehtml  表格元素
 */
export const downloadXlsx = (tablehtml,tableName) => {
  if(document.getElementsByClassName('gutter')[0]){
    document.getElementsByClassName('gutter')[0].remove();
  }
  tablehtml = '<html><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><style>td{border:1px solid #dfe6ec;padding: 20px;}tr{height: 40px;</style><body>'+tablehtml.innerHTML+'</body></html>';
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(tablehtml));
  element.setAttribute('download', tableName +'_'+ new Date().getTime()+'.xls');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
