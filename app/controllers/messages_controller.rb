class MessagesController < ApplicationController
  skip_forgery_protection

  before_action :set_message, only: %i[destroy]

  # GET /messages or /messages.json
  def index
    @messages = Message.all.order(created_at: :desc)
  end

  # POST /messages or /messages.json
  def create
    @message = Message.new(body: params[:body])

    if @message.save
    Broadcast::Message.new(@message).prepend
    end

    respond_to do |format|
      format.html { redirect_to messages_path }
      format.turbo_stream
    end
  end

  # DELETE /messages/1 or /messages/1.json
  def destroy
    @message.destroy
 
    Broadcast::Message.new(@message).remove

    respond_to do |format|
      format.html { redirect_to messages_url, notice: I18n.t("messages.destroy.success") }
      format.json { head :no_content }
      format.turbo_stream
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_message
    @message = Message.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def message_params
    params.fetch(:message, {})
  end
end
