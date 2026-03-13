// Delete modal
function confirmDelete(jobId) {
  const modal = document.getElementById('deleteModal');
  const link = document.getElementById('deleteLink');
  if (modal && link) {
    link.href = `/jobs/${jobId}/delete`;
    modal.classList.remove('hidden');
  }
}

function closeModal() {
  const modal = document.getElementById('deleteModal');
  if (modal) modal.classList.add('hidden');
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('deleteModal');
  if (modal && e.target === modal) closeModal();
});
