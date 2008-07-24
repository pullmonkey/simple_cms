class SimpleCmsImage < ActiveRecord::Base
  has_attachment :content_type => :image,
                 :storage      => :file_system,
                 :path_prefix  => "public/simple_cms_data/images",
                 :max_size     => 2.megabytes,
                 :thumbnails   => { :thumb => '50x50>' }

  validates_as_attachment
end
