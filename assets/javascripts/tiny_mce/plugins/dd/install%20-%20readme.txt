
This tinymce plugin allows you to mark a text selection as a code block.

To activate, add this plugin "dd" to your tinymce plugins list. Add the button 
"dd_code" to your tinymce's button list, and it should appear as a new button 
in the button panel. Clear your browsers cache.

Edit tinymce's (editor_content.css) and your themes' CSS to accomodate the new 
styles introduce with this plugin:


span.sfcode {
	color:#666666; 
	background:#EBEBEB; 
	padding:0px 2px;
	font: 10px monospace;
}

div.sfcode {
	color:#666666; 
	background:#EBEBEB; 
	padding:1px 2px;
	margin-left:20px;
	font: 10px monospace;
} 

the span style is used for one-line code highlighting. The div style, when the
highlighted code spans across multiple lines.