import{F as i}from"./index-jttcYZ4g.js";const e=({value:n,onClick:t,isActive:s})=>{const o=document.createElement("li");return o.className=`ipn__options-item ${s?"ipn__options-item_active":""}`,o.dataset.phonemaskCountryCode=n.code,o.title=n.country,o.innerHTML=`
		<span class="ipn__options-flag" style="background-position: ${i[n.code]}"></span>
		<span class="ipn__options-name">${n.country}</span>
		<span class="ipn__options-code">${n.prefix}</span>
	`,o.onclick=()=>t(n),o};export{e as getOptionsItem};
