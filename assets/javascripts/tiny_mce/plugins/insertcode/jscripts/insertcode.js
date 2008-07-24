var action, codeDiv, codeType;

function init() {
	tinyMCEPopup.resizeToInnerSize();
  var editor_id = tinyMCE.getWindowArg('editor_id');
	var inst = tinyMCE.getInstanceById(editor_id);
	codeDiv = tinyMCE.getParentElement(inst.getFocusElement(), "CODE_HIGHLIGHTING", function(n)
	    {
	        return n.parentNode && n.parentNode.tagName == "CODE_HIGHLIGHTING" && n.parentNode.className == "insert_code";
  });

  //alert("codeDiv: " + codeDiv);

  var focusElm = inst.getFocusElement();
  //alert("focusElm node type: " + focusElm.nodeType);
  //alert("focusElm: " + focusElm.toSource());
  //alert("focusElm: " + focusElm.toString());
  //alert("focusElm: " + focusElm.valueOf());
  //alert("focusElm: " + String(focusElm));
  //alert("focusElm tag type: " + focusElm.tag);
  // If this has <code_highlighting tags already then
  // we are going to use that content
  if (focusElm.nodeName == "CODE_HIGHLIGHTING") {
    action = 'update';
    // Select all text
    tinyMCE.execInstanceCommand(editor_id,'mceSelectNodeDepth',false,'0');
    // Put text in editor
    document.forms[0].codeContent.value = focusElm.textContent;
  } else {
	  action = 'insert';
  }

	document.forms[0].insert.value = tinyMCE.getLang('lang_' + action, 'Insert', true);
	resizeInputs();
}

function insertText() {
  var editor_id = tinyMCE.getWindowArg('editor_id');
  var inst = tinyMCE.getInstanceById(editor_id);
  var focusElm = inst.getFocusElement();
  var selectedText = inst.selection.getSelectedHTML();

  //alert("focusElm: " + focusElm);
  //alert("focusElm node name: " + focusElm.nodeName);
  //alert("focusElm node value: " + focusElm.nodeValue);
  //alert("focusElm text content: " + focusElm.textContent);
  //alert("selectedText: \n" + selectedText);
}

function insertCode() {
  //alert("You are inside the insertCode() function");
	var codeType = document.forms[0].codeType.options[document.forms[0].codeType.selectedIndex].value;
	var codeLegend = document.forms[0].codeLegend.value;
	var code = document.forms[0].codeContent.value;

  doInsertCode(codeType,codeLegend,code);
}

function doInsertCode(codeType,codeLegend,code) {
  //alert("You are inside the doInsertCode() function");
	var inst = tinyMCE.getInstanceById(tinyMCE.getWindowArg('editor_id'));
	tinyMCEPopup.execCommand("mceBeginUndoLevel");
  //alert("action = " + action);

	if (action == "update") {
		codeDiv.className = codeType;
		codeDiv.innerHTML = '';
		codeDiv.innerHTML = code;
	} else {
    code = formatCode(code);
    //alert("code: \n" + code);
		//fullCode = '<div class="insert_code_' + codeType + '">\n' + code + '\n</div>';
		fullCode = '<code_highlighting type="' + codeType + '">\n' + code + '\n</code_highlighting>';
    //alert("full code: \n" + fullCode);

		tinyMCEPopup.execCommand("mceInsertContent", false, fullCode);
		tinyMCE.handleVisualAid(inst.getBody(), true, inst.visualAid, inst);
	}

	tinyMCEPopup.execCommand("mceEndUndoLevel");

	tinyMCE.triggerNodeChange();
	if(tinyMCE.isGecko) {
	   // workaround a FF bug   
	   setTimeout(function(){tinyMCEPopup.close();},1000);
	} else {
	   tinyMCEPopup.close();
	}
}

function formatCode(code) {
  code = code.replace(/ /g,"&nbsp;");
  code = code.replace(/\t/g,"&nbsp;&nbsp;");
  code = code.replace(/</g,"&lt;");
  code = code.replace(/>/g,"&gt;");
  code = code.replace(/\n/g,"<br />");

  return code;
}

var wHeight=0, wWidth=0;

function resizeInputs() {
	if (!tinyMCE.isMSIE) {
		 wHeight = self.innerHeight-140;
		 wWidth = self.innerWidth-16;
	} else {
		 wHeight = document.body.clientHeight - 165;
		 wWidth = document.body.clientWidth - 16;
	}

	document.forms[0].codeContent.style.height = Math.abs(wHeight) + 'px';
	document.forms[0].codeContent.style.width  = Math.abs(wWidth) + 'px';
	document.forms[0].codeLegend.style.width  = Math.abs(wWidth) + 'px';
}

function deleteHighlighting(withTags) {
    
    var stripped = withTags.replace(/\n/gi, "");
    var stripped = stripped.replace(/\r/gi, "");
    
    // Remove very first <li >
    var stripped = stripped.replace(/\<li[^\>]*\>/i, "");

    // Replace following <li >'s with newlines.    
    var stripped = stripped.replace(/\<li[^\>]*\>/gi, "\n");
    
    // Remove all remaining tags
    var stripped = stripped.replace(/\<[^\>]*\>/gi, "");
    
    var stripped = stripped.replace(/\&nbsp\;/gi, " ");
    var stripped = stripped.replace(/\&amp\;/gi, "&");
    var stripped = stripped.replace(/\&lt\;/gi, "<");
    var stripped = stripped.replace(/\&gt\;/gi, ">");
    var stripped = stripped.replace(/\&quot\;/gi, "\"");
    
    document.forms[0].codeContent.value = stripped;
    return true;
}
