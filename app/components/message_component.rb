class MessageComponent < ViewComponent::Base
  include ActionView::RecordIdentifier

  def initialize(message:)
    @message = message
  end

  private

  attr_reader :message

  delegate :body, :created_at, to: :message, prefix: true

  def recent_message?
    message.created_at > 1.minute.ago
  end

  def timestamp
    message_created_at.strftime("%Y-%m-%d at %H:%M")
  end
end
