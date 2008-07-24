class SimpleCmsItem < ActiveRecord::Base
  acts_as_versioned

  #def page_path
  #  h = YAML.load(params)
  #  h.delete("label")
  #  return h
  #  #return "/" + h["id"].join("/")
  #end
  
  def label
    h = YAML.load(params)
    return h["label"]
  end

end
