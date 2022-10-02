module Broadcast
  class Message
    def initialize(message)
      @message = message
    end

    def prepend
      Turbo::StreamsChannel.broadcast_prepend_later_to(
        :messages,
        target: "messages",
        html: rendered_component
      )
    end

    def remove
      Turbo::StreamsChannel.broadcast_remove_to(
        :messages,
        target: "message_#{message.id}"
      )
    end

    private

    attr_reader :message

    def rendered_component
      ApplicationController.render(
        ::Message::Component.new(message: message),
        layout: false
      )
    end
  end
end
