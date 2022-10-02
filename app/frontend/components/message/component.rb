# frozen_string_literal: true

class Message::Component < ApplicationViewComponent
  include ActionView::RecordIdentifier
  with_collection_parameter :message

  option :message

  private

  delegate :body, :created_at, to: :message, prefix: true

  def recent_message?
    message.created_at > 1.minute.ago
  end

  def timestamp
    message_created_at.strftime("%Y-%m-%d at %H:%M")
  end
end
