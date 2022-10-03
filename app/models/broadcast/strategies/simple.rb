module Broadcast
  module Strategies
    class Simple
      extend Dry::Initializer

      param :resource
      param :component
      param :opts, default: proc { {component: {}} }

      def prepend
        Turbo::StreamsChannel.broadcast_prepend_later_to(
          :messages,
          target: collection_target,
          html: rendered_component
        )
      end

      def remove
        Turbo::StreamsChannel.broadcast_remove_to(
          :messages,
          target: singular_target
        )
      end

      private

      def collection_target
        resource.class.name.pluralize.underscore
      end

      def singular_target
        [resource.class.name.singularize.underscore, resource.id].join("_")
      end

      def singular_sym
        resource.class.name.singularize.underscore.to_sym
      end

      def rendered_component
        ApplicationController.render(component.new(**component_opts), layout: false)
      end

      def component_opts
        {singular_sym => resource}.merge(opts[:component])
      end
    end
  end
end
