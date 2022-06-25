import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export async function openAction(evt, actionName){
    let i, actioncontent, actionlinks;
    actioncontent = document.getElementsByClassName("actionContent");
    for (i = 0; i < actioncontent.length; i++) {
        actioncontent[i].style.display = "none";
    }
    actionlinks = document.getElementsByClassName("action-links");
    for (i = 0; i < actionlinks.length; i++) {
        actionlinks[i].className = actionlinks[i].className.replace(" active", "");
    }
    document.getElementById(actionName).style.display = "block";
    document.getElementById('profileInstruction').style.display = "none";
    evt.currentTarget.className += " active";
  };

  export function loadToast(msg, toast_type){
    this.show = true
    this.message = msg
    this.type = toast_type

    // show toast for 5secs
    setTimeout(()=>{
          this.type = null
          this.message = null
        }, 3000)
  }

  export function todaysDate(){
    const date_now = new Date();
    const offset = date_now.getTimezoneOffset();
    const adjusted_date = new Date(date_now.getTime() - (offset*60*1000));
    return adjusted_date.toISOString().split('T')[0]
  }

export function floExpensesReportByDate(expenses_data, columns_data, start_date, end_date){
  if(expenses_data){
    let expenses_total = expenses_data.reduce((sum, el) => sum + el.amount, 0);
    let totals = [{content: `Total Expenses = ${expenses_total.toLocaleString()}`, colSpan: 4, styles:{halign:'center'}}]

    let new_data = [...expenses_data.map(el => [
      el.purpose.toUpperCase(), 
      el.expense_client.toUpperCase(),
      el.amount.toLocaleString(),
      el.expense_date]), totals]


  const addFooters = footer => {
    const pageCount = footer.internal.getNumberOfPages()
    footer.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      footer.setPage(i)
      footer.text('Page ' + String(i) + 
      ' of ' + String(pageCount),
       footer.internal.pageSize.width / 2, 287, {
        align: 'center'
      })
    }
  }
  const generationDate = new Date().toLocaleDateString('en-GB', {  
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });

  const drawCell = function(data) {
    let doc = data.doc;
    let rows = data.table.body;
    if (rows.length === 1) {
    } else if (data.row.index === rows.length - 1) {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize("12");
      doc.setTextColor(52,147,223);
      doc.setFillColor(255, 255, 255);
    }
  };
 
  const company = "FloET";
  const reportHeading = `Flo Expenses between the dates of ${start_date} and ${end_date}`;


  let doc = new jsPDF()
  
  autoTable(doc, {
    body: new_data,
    columns: columns_data,
    margin: { top:30, horizontal: 10 },
    headStyles: {fillColor: [0,150,214], font:'helvetica', fontStyle: 'bold'},
    bodyStyles: {fontSize:8,font:'helvetica',fontStyle:'bold'},
    theme: "grid",
    showHead: "everyPage",
    willDrawCell: drawCell,
    
    didDrawPage: function (data) {
    //Document Header
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold')
    doc.text([String(company), String(reportHeading)],10,10)
    }
  });
  addFooters(doc)
  doc.save(`Report for flo expenses between the dates of ${start_date} and ${end_date} report generated on ${generationDate}.pdf`)
}
}

export function foremanExpensesReportByDate(expenses_data, columns_data, start_date, end_date){
  if(expenses_data){
    let expenses_total = expenses_data.reduce((sum, el) => sum + el.amount, 0);
    let totals = [{content: `Total Expenses = ${expenses_total.toLocaleString()}`, colSpan: 4, styles:{halign:'center'}}]

    let new_data = [...expenses_data.map(el => [
      el.purpose.toUpperCase(), 
      el.expense_client.toUpperCase(),
      el.amount.toLocaleString(),
      el.expense_date]), totals]


  const addFooters = footer => {
    const pageCount = footer.internal.getNumberOfPages()
    footer.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      footer.setPage(i)
      footer.text('Page ' + String(i) + 
      ' of ' + String(pageCount),
       footer.internal.pageSize.width / 2, 287, {
        align: 'center'
      })
    }
  }
  const generationDate = new Date().toLocaleDateString('en-GB', {  
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });

  const drawCell = function(data) {
    let doc = data.doc;
    let rows = data.table.body;
    if (rows.length === 1) {
    } else if (data.row.index === rows.length - 1) {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize("12");
      doc.setTextColor(52,147,223);
      doc.setFillColor(255, 255, 255);
    }
  };
 
  const company = "FloET";
  const reportHeading = `Foreman Expenses between the dates of ${start_date} and ${end_date}`;


  let doc = new jsPDF()
  
  autoTable(doc, {
    body: new_data,
    columns: columns_data,
    margin: { top:30, horizontal: 10 },
    headStyles: {fillColor: [0,150,214], font:'helvetica', fontStyle: 'bold'},
    bodyStyles: {fontSize:8,font:'helvetica',fontStyle:'bold'},
    theme: "grid",
    showHead: "everyPage",
    willDrawCell: drawCell,
    
    didDrawPage: function (data) {
    //Document Header
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold')
    doc.text([String(company), String(reportHeading)],10,10)
    }
  });
  addFooters(doc)
  doc.save(`Report for foreman expenses between the dates of ${start_date} and ${end_date} report generated on ${generationDate}.pdf`)
}
}

export function moniesToForemanReportByDate(monies_data, columns_data, start_date, end_date){
  if(monies_data){
    let monies_total = monies_data.reduce((sum, el) => sum + el.amount, 0);
    let totals = [{content: `Total Monies = ${monies_total.toLocaleString()}`, colSpan: 4, styles:{halign:'center'}}]

    let new_data = [...monies_data.map(el => [
      el.purpose.toUpperCase(), 
      el.expense_client.toUpperCase(),
      el.amount.toLocaleString(),
      el.expense_date]), totals]


  const addFooters = footer => {
    const pageCount = footer.internal.getNumberOfPages()
    footer.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      footer.setPage(i)
      footer.text('Page ' + String(i) + 
      ' of ' + String(pageCount),
       footer.internal.pageSize.width / 2, 287, {
        align: 'center'
      })
    }
  }
  const generationDate = new Date().toLocaleDateString('en-GB', {  
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });

  const drawCell = function(data) {
    let doc = data.doc;
    let rows = data.table.body;
    if (rows.length === 1) {
    } else if (data.row.index === rows.length - 1) {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize("12");
      doc.setTextColor(52,147,223);
      doc.setFillColor(255, 255, 255);
    }
  };
 
  const company = "FloET";
  const reportHeading = `Monies to foreman between the dates of ${start_date} and ${end_date}`;


  let doc = new jsPDF()
  
  autoTable(doc, {
    body: new_data,
    columns: columns_data,
    margin: { top:30, horizontal: 10 },
    headStyles: {fillColor: [0,150,214], font:'helvetica', fontStyle: 'bold'},
    bodyStyles: {fontSize:8,font:'helvetica',fontStyle:'bold'},
    theme: "grid",
    showHead: "everyPage",
    willDrawCell: drawCell,
    
    didDrawPage: function (data) {
    //Document Header
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold')
    doc.text([String(company), String(reportHeading)],10,10)
    }
  });
  addFooters(doc)
  doc.save(`Report for monies to foreman between the dates of ${start_date} and ${end_date} report generated on ${generationDate}.pdf`)
}
}