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