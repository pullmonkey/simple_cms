# SimpleCMS
ActionView::Base.class_eval do
  alias_method :render_otherwise, :render
  
  def render(options = {}, old_local_assigns = {}, &block) #:nodoc:
    if options.is_a?(Hash) && options[:simpleCMS]
      render_simple_cms(options)
    else
      render_otherwise(options, old_local_assigns, &block)
    end
  end
  
  def render_simple_cms(options = {})
		@label      = (options[:simpleCMS].blank?)? "defaultLabel" : options[:simpleCMS]
    @domain     = controller.request.env["HTTP_X_FORWARDED_HOST"] if controller.request.env["HTTP_X_FORWARDED_HOST"]
    @reusable   = options[:reusable] || false
    if @reusable
      @cms_params = {:label => @label, :domain => @domain}.to_yaml.gsub(/\r/,"")
    else
		  @cms_params = controller.params.
                    merge(:label => @label, :domain => @domain).
                    to_yaml.gsub(/\r/,"")
    end
    @cms_admin  = options[:admin]  || false
    @cms_user   = options[:user]   || "N/A"
    @prefix     = options[:prefix] || "" 

		session["cms_admin"]             ||= {}  
    session["cms_admin"][@cms_params]  = @cms_admin
    session["cms_user"]              ||= {}
    session["cms_user"][@cms_params]   = @cms_user
    session["cms_prefix"]            ||= {}
    session["cms_prefix"][@cms_params] = @prefix
    #session["cms_referer"]             = controller.request.env["REQUEST_PATH"].gsub(/\/sites.*skizmo.com/,"")
    #session["cms_referer"]             = "/" if session["cms_referer"].blank?
    request_path = controller.request.env["REQUEST_PATH"] || controller.request.env["REQUEST_URI"] || controller.request.env["SCRIPT_NAME"]
    session["cms_referer"]             = request_path.nil? ? "/" : request_path.gsub(/\/sites.*skizmo.com/,"")

    
		# link to add new data
		# display current data if any
		item = SimpleCmsItem.find_by_params(@cms_params)
    if !item
		  item = SimpleCmsItem.create(:params => @cms_params, :created_by => @cms_user, :updated_by => @cms_user)
    end
  	render :partial => shared_path("simple_cms_item"), 
           :object  => item
  end

	def cms_shared_path(partial_path)
		shared_path(partial_path)
	end

private

	# Path to CMS Files that the end user will experience
	# 1 partial for adding content
	# 1 partial for viewing/editing content
	def shared_path(partial_path)
    return "shared/#{partial_path}"
	end
  
  def parse_coderay(text)
    text.scan(/(<code_highlighting type=\"([a-z].+?)\">(.+?)<\/code_highlighting>)/m).each do |match|
      logger.error("\ncode: " + match[2])
      match[2] = match[2].gsub("<br />", "").
                          gsub("&nbsp;", " ").
                          gsub("&lt;", "<").
                          gsub("&gt;", ">").
                          gsub("&quot;", "\"")
      match[2] = match[2] + "\n"
      logger.error("\nnew code: " + match[2])
      text.gsub!(match[0],CodeRay.scan(match[2], match[1].to_sym).div( :line_numbers => :table, :css => :class))
    end
    return text
  end

end 
