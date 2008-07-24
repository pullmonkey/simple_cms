# Install hook code here
require 'ftools'

puts "\n\nMoving all required javascript and css files to your public directory..."
`rake simple_cms:install`
puts "\n\nsimple_cms requires 4 dependencies...attachment_fu, responds_to_parent, acts_as_versioned, and coderay. To install them use: \n'rake simple_cms:install_dependencies'\n\n"
puts IO.read(File.join(File.dirname(__FILE__), 'README'))
