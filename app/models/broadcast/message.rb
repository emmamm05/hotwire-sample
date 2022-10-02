module Broadcast
  class Message
    def self.prepend(message:)
      new(message).prepend
    end

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
