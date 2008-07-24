/**
 * $Id: editor_plugin_src.js 166 2007-01-05 10:31:50Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright  2004-2007, Moxiecode Systems AB, All rights reserved.
 */

tinyMCE.importPluginLanguagePack('dd');

var TinyMCE_dd_Plugin = {

	getInfo : function() {
		return {
			longname : 'd:d',
			author : 'Oliver Seidel',
			authorurl : 'http://www.deliciousdays.com',
			infourl : 'http://www.deliciousdays.com',
			version : "1.0"
		};
	},
	
	initInstance : function(inst) {
		inst.addShortcut('ctrl', 'p', 'lang_dd_code_desc', 'mcedd_code');
	},

	getControlHTML : function(cn) {
		switch (cn) {
			case "dd_code":
				return tinyMCE.getButtonHTML(cn, 'lang_dd_code_desc', '{$pluginurl}/images/dd_code.gif', 'mcedd_code', true);
		}

		return "";
	},

	execCommand : function(editor_id, element, command, user_interface, value) {

		switch (command) {
				
			case "mcedd_code":
				var anySelection = false;
				var inst = tinyMCE.getInstanceById(editor_id);
				var focusElm = inst.getFocusElement();
				var selectedText = inst.selection.getSelectedHTML();

				if ( focusElm.nodeName == "SPAN" && tinyMCE.getAttrib(focusElm, 'class') == "sfcode" ) {
          alert("This was a SPAN");
					
					var parent = focusElm.parentNode; 			

					if ( focusElm.previousSibling && focusElm.previousSibling.nodeName.toUpperCase() == "#TEXT" )
						focusElm.previousSibling.nodeValue = focusElm.previousSibling.nodeValue + focusElm.textContent;
					else if (focusElm.nextSibling && focusElm.nextSibling.nodeName.toUpperCase() == "#TEXT")
						focusElm.nextSibling.nodeValue = focusElm.nextSibling.nodeValue + focusElm.textContent;
					else {
						var newp = inst.getDoc().createElement("p"); 
						var newText = inst.getDoc().createTextNode( focusElm.textContent ); 
						newp.appendChild(newText); 
						var replaced = parent.replaceChild(newp,focusElm);					
					}


					parent.removeChild(focusElm);
					tinyMCE.selectedInstance.repaint();
					
				}
				else if ( focusElm.nodeName == "DIV" && tinyMCE.getAttrib(focusElm, 'class') == "sfcode" ) {
          alert("This was a DIV");
					
					var parent = focusElm.parentNode; 			

					var newp = inst.getDoc().createElement("p"); 

					childcount = focusElm.childNodes.length;
					for(j=0;j<childcount;j++) {
						newp.appendChild(focusElm.childNodes[0]); 
					}
					
					var replaced = parent.replaceChild(newp,focusElm);					

					//parent.removeChild(focusElm);
					tinyMCE.selectedInstance.repaint();
					
				}
				else if( selectedText.length > 0 )
				{
          alert("This is everything else");

					if ( selectedText.match(/<br\s?\/>/) ||  selectedText.match(/<p>/) )
						html = '<div class="sfcode">'+selectedText+'</div>';
					else
						html = '<span class="sfcode">'+selectedText+'</span>';
					
					tinyMCE.execInstanceCommand(editor_id, 'mceInsertContent', false, html);
					tinyMCE.selectedInstance.repaint();
				}
				else
					return true;
					
				// Let TinyMCE know that something was modified
				tinyMCE.triggerNodeChange(false);
				return true;
		}

		return false;
	},

	handleNodeChange : function(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {

		if ( (node.nodeName == "SPAN" || node.nodeName == "DIV") && tinyMCE.getAttrib(node, 'class') == "sfcode" ) {
			tinyMCE.switchClass(editor_id + '_dd_code', 'mceButtonSelected');
			return true;
		}
		else if ( any_selection == "" ) {
			tinyMCE.switchClass(editor_id + '_dd_code', 'mceButtonDisabled');
			return true;
		}
		else
			tinyMCE.switchClass(editor_id + '_dd_code', 'mceButtonNormal');
	},

	cleanup : function(type, content, inst) { 
	
		switch (type) {
			case "insert_to_editor_dom": 			    
            break;
			case "insert_to_editor":
			break;
			case "get_from_editor":
			break;
		}
	
	return content; 
	},

	// Private plugin internal methods
	_someInternalFunction : function(a, b) {
		return 1;
	}
};

// Add the plugin class to the list of available TinyMCE plugins
tinyMCE.addPlugin("dd", TinyMCE_dd_Plugin);
