'use strict';

document.addEventListener('DOMContentLoaded', () => {
	//Tabs----------------------------------------------------
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabsContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show');
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
	hideTabsContent();
	showTabContent();

	tabsParent.addEventListener('click', event => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabsContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer------------------------------------------------------
	const deadline = '2025-02-25';

	function getTimeRemaining(endtime) {
		let days, seconds, minutes, hours;
		const t = Date.parse(endtime) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			seconds = 0;
			minutes = 0;
			hours = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			seconds = Math.floor((t / 1000) % 60);
			minutes = Math.floor((t / 1000 / 60) % 60);
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		}

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	//Modal------------------------------------------------------
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalClose = document.querySelector('[data-close]');

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	modalClose.addEventListener('click', closeModal);

	modal.addEventListener('click', e => {
		if (e.target === modal) {
			closeModal();
		}
	});
	document.addEventListener('keydown', e => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 3000);

	window.addEventListener('scroll', showModalByScroll);

	function closeModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearTimeout(modalTimerId);
	}

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
});
