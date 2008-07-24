class SimpleCmsMedia < ActiveRecord::Base
  has_attachment :storage      => :file_system,
                 :max_size     => 500.megabytes,
                 :path_prefix  => "public/simple_cms_data/media"#,
                 #:thumbnails   => { :thumb => '75x75>' }
                 #:content_type => "",

  validates_as_attachment
end
