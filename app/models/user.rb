class User < ApplicationRecord
  attr_reader :password

  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token

  has_many :tracks,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :Track

  has_many :comments
    
  # associations:
  # has_many :tracks
  # has_many :comments
  # has_many :likes

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
