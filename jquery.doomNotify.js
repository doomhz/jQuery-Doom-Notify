/**
* Doom Notify jQuery Plugin
*
* @author Dumitru Glavan
* @version 1.0
* @requires jQuery v1.3.2 or later
*
* @example: $.doomNotice({message:'Click here to see more stuff!'});
* @example: $.doomWarn({message:'Soemthing is very wrong in here!'});
*
* Examples and documentation at: https://github.com/doomhz/jQuery-Notify
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
(function ($) {
	$.doomNotice = function (options) {
		this.config = $.extend($.doomNotify, options);
		var self = this;

		var closeBt = this.config.closeButton ? this.config.closeBtHtml : '';
		var notice = this.config.notifyHtml.replace('{type}', this.config.type);
		notice = notice.replace('{closeButton}',  closeBt);
		notice = notice.replace('{message}', this.config.message);

		this.insertNotice = function () {
			var $notice = $(notice).hide().insertAfter(this.config.after).slideDown(this.config.animationDuration);
			$('.notify-close-bt', $notice).click(function () {
				var $selfClose = $(this);
				(typeof(self.config.beforeClose) === 'function') && self.config.beforeClose($notice);
				$($selfClose).parents('.notify-' + self.config.type).slideUp(function () {
					(typeof(self.config.afterClose) === 'function') && self.config.afterClose($notice);
					$(this).remove();
				});
			});
		}

		setTimeout(function () {self.insertNotice();}, self.config.delayBeforeShow);

		return this;
	},

	$.doomWarn = function (options) {
		return $.doomNotice($.extend({type: 'warn'}, options));
	},

	$.doomNotify = {
		type: 'notice',
		after: '#header',
		message: '',
		closeButton: true,
		notifyHtml: '<div class="notify-{type}">\n\
									<div class="notify-container">\n\
										<span class="notify-icon"></span>\n\
										<span class="notify-message">{message}</span>\n\
										{closeButton}\n\
									</div>\n\
								</div>',
		closeBtHtml: '<a href="#" class="notify-close-bt"><span class="notify-close-bt-text">Hide me</span></a>',
		animationDuration: 500,
		delayBeforeShow: 0,
		afterClose: null,
		beforeClose: null
	}

})(jQuery);