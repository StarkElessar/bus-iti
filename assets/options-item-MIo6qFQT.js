import{F as n}from"./index-BMogHNnx.js";const c=({value:t,onClick:o,isActive:i})=>{const s=document.createElement("li");return s.className=`bus-iti__options-item ${i?"bus-iti__options-item_active":""}`,s.dataset.phonemaskCountryCode=t.code,s.title=t.country,s.innerHTML=`
		<span class="bus-iti__options-flag" style="background-position: ${n[t.code]}"></span>
		<span class="bus-iti__options-name">${t.country}</span>
		<span class="bus-iti__options-code">${t.prefix}</span>
	`,s.onclick=()=>o(t),s};export{c as getOptionsItem};
