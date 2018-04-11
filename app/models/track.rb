class Track < ApplicationRecord
  validates :title, presence: true
  validates :uploader_id, presence: true

  has_attached_file :image, default_url: "https://s3-us-west-1.amazonaws.com/vibesky-dev/tracks/images/public_images/missing.png"
  validates_attachment_content_type :image,
  :content_type => /^image\/(jpg|jpeg|pjpeg|png|x-png|gif)$/,
   :message => 'file type is not allowed (only jpeg/png/gif images)'

   has_attached_file :audio
 validates_attachment_content_type :audio, :content_type => [ 'audio/mpeg',
   'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3',
   'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio' ]

  belongs_to :user,
  primary_key: :id,
  foreign_key: :uploader_id,
  class_name: :User

  has_many :comments
end
