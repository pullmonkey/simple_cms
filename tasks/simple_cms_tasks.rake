# desc "Explaining what the task does"
namespace :simple_cms do
  
  PLUGIN_ROOT = File.dirname(__FILE__) + '/../'

  desc 'Installs required javascript and css files to the public/javascripts and public/stylesheets directories'
  task :install do
    puts "COPYING *.js:"
    FileUtils.cp Dir[PLUGIN_ROOT + '/assets/javascripts/*.js'], RAILS_ROOT + '/public/javascripts'
    puts "COPYING tiny_mce:"
    FileUtils.cp_r Dir[PLUGIN_ROOT + '/assets/javascripts/tiny_mce'], RAILS_ROOT + '/public/javascripts'
    puts "COPYING *.css:"
    FileUtils.cp Dir[PLUGIN_ROOT + '/assets/stylesheets/*.css'], RAILS_ROOT + '/public/stylesheets' 
  end
  
  desc 'Uninstalls all javascript and css files that were created by the simple_cms:install'
  task :uninstall do
    puts "REMOVING /public/javascripts/tiny_mce:"
    FileUtils.rm_rf RAILS_ROOT + '/public/javascripts/tiny_mce'
    puts "REMOVING /public/javascripts/simple_cms.js"
    FileUtils.rm RAILS_ROOT + '/public/javascripts/simple_cms.js'
    puts "REMOVING /public/stylesheets/simple_cms.css"
    FileUtils.rm RAILS_ROOT + '/public/stylesheets/simple_cms.css'
    puts "REMOVING /public/stylesheets/coderay.css"
    FileUtils.rm RAILS_ROOT + '/public/stylesheets/coderay.css'
  end

  desc 'Installs simple_cms dependencies(attachment_fu, responds_to_parent, acts_as_versioned, and coderay)'
  task :install_dependencies do
    puts "Installing plugin attachment_fu..."
    puts `ruby script/plugin install http://svn.pullmonkey.com/plugins/trunk/attachment_fu/`
    puts "Installing plugin responds_to_parent..."
    puts `ruby script/plugin install http://svn.pullmonkey.com/plugins/trunk/responds_to_parent/`
    puts "Installing plugin acts_as_versioned..."
    puts `ruby script/plugin install http://svn.pullmonkey.com/plugins/trunk/acts_as_versioned/`
    puts "Installing plugin coderay..."
    puts `ruby script/plugin install http://svn.pullmonkey.com/plugins/trunk/coderay/`
  end
end
