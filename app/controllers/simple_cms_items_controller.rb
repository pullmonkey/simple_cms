class SimpleCmsItemsController < ApplicationController
  # For Rails version 2.1 and greater
	self.append_view_path(File.join(File.dirname(__FILE__), '..', 'views'))
  # For Rails version 2.0 and greater
	#self.view_paths << File.join(File.dirname(__FILE__), '..', 'views')
  # For Rails versions less than 2.0
	#self.template_root = File.join(File.dirname(__FILE__), '..', 'views')
  
  skip_before_filter :verify_authenticity_token
  #before_filter :authenticate
  require 'coderay'
  layout 'plugin'
  #caches_action :content
	def edit
    logger.error("\ncms_referer: " + session["cms_referer"].to_s + "\n\n")
    # if no referer, then redirect to base root of application
    # the user jumped to edit without going through the interface
    # this is a no no for many reasons
    if session["cms_referer"].nil?
      logger.error("\nThere was no referer!!\n\n")
      # derive base root path
      path = request.env["REQUEST_PATH"].gsub(/simple_cms_items.*$/, "")
      redirect_to path
      return
    end
    
		@simple_cms_item = SimpleCmsItem.find(params[:id])
    @versions = @simple_cms_item.versions
################ CHECK THIS ##########    @cms_item_version = @simple_cms_item
    @prefix = session["cms_prefix"][@simple_cms_item.params]

    # if user is not an admin, redirect to the refering page
    if !session["cms_admin"][@simple_cms_item.params]
      redirect_to session["cms_referer"]
			return
		elsif request.post?
      if !(@simple_cms_item.data.to_s == params[:simple_cms_item][:data].to_s)
        @simple_cms_item.updated_by = session["cms_user"][@simple_cms_item.params]
        @simple_cms_item.update_attributes(params[:simple_cms_item])
      else
        logger.error("\nUser did not make any changes\n")
      end
      redirect_to session["cms_referer"]
      return
		end
	end

  def show_revision
    @simple_cms_item = SimpleCmsItem.find(params[:id].to_i)
    @cms_item_version = @simple_cms_item.versions.find_by_version(params[:version].to_i)
    respond_to do |format|
      format.js
    end
  end

  def use_revision
    @simple_cms_item = SimpleCmsItem.find(params[:id])
    @simple_cms_item.revert_to!(params[:version].to_i)
    redirect_to session["cms_referer"]
  end

  def insert_revision
    @simple_cms_item = SimpleCmsItem.find(params[:id].to_i)
    @cms_item_version = @simple_cms_item.versions.find_by_version(params[:version].to_i)
    @simple_cms_item.revert_to!(@cms_item_version.version)
    @versions = @simple_cms_item.versions
  end

end
